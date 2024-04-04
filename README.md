# MissionPlannerApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

The goal of this app is to allow the user to control a robot by creating a mission and vizualizing the planned mission in the player screen. The app is organized in three main screens:

* Home page - contains the description of the application and steps for how to install and use it
* Planner page - used to create a mission which tells the robot where to walk point after point
* Player page - allows the user to playback the created mission in order to visually verify it

The app is built using the Angular and Angular Material libraries. Each of the three pages is created as an Angular module, the pages are connected using routing and all pages are accesible from the toolbar of the application.

### Prerequisites

* Install the most recent Node.js runtime environment (version 20.11.0 was used for testing the application).
* You will need a terminal app to run the installation commands (Windows powershell, Git Bash, etc.).

### Installation steps

* Clone the application from the github repository by using the following command
`git clone https://github.com/andtt90/mission-planner-app.git`
* Navigate to the application folder and run the following command to install all npm packages used
`npm install`
* Run the following command to serve the application
`ng serve`
* Access the application by navigating to the following address using your web browser http://localhost:4200

### How to use

* Use the planner page to create a mission for the robot by providing a list of coordinates(x/y) where the robot should walk to
* Verify the planned mission by using the player page. Use the play button to start moving the robot. The stop button can be used stop the movement of the robot

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
