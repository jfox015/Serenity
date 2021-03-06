<?php
define('ENVIRONMENT', isset($_SERVER['APP_ENV']) ? $_SERVER['APP_ENV'] : 'production');

require_once "vendor/autoload.php";
require_once "config.php"; 
require_once "app/migration.php"; 

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

define("MIGRATIONS_PATH", __DIR__."/migrations");

/**
 * Script for creating, destroying, and seeding the app's database
 */
class Install {

    function run($db)
    {
        error_reporting(E_ALL);
        if (!ini_get('display_errors'))
        {
            ini_set('display_errors', 1);
        }
        $capsule = new Capsule;
        $capsule->addConnection($db[ENVIRONMENT]);
        $capsule->setEventDispatcher(new Dispatcher(new Container));
        // If you want to use the Eloquent ORM...
        $capsule->bootEloquent();
        /* DB methods accessible via Slim instance */
        $capsule->setAsGlobal();

        $args = isset($_GET['type']) ? filter_input($_GET['type']) : "install";
        switch ($args) 
        {
            case "install":
                $this->installMigrations($capsule);
                 break;
            case "remove":
                $this->removeMigrations($capsule);
                break;
        }
    }

    function installMigrations($capsule)
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');
        
        foreach ($files as $file) {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);
            $migration = new $class;
            $migration->init($capsule);
            if ($migration->up()) 
            {
                echo("Sucessfully installed migration ".$file."<br />");
            }
            if ($migration->seed === true) 
            {
                $seeder = $class."Seed";
                $seedClass = new $seeder;
                $seedClass->run();
            }
        }
    }
    function removeMigrations()
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');

        foreach ($files as $file) 
        {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);

            $migration = new $class;
            $migration->init($capsule);
            $migration->down();
            if ($migration->down()) 
            {
                echo("Sucessfully removed migration ".$file."<br />");
            }
        }
    }
}

$install = new Install();
$install->run($db);