void setup() { // this is run once.   
        // set the background color
        background(150, 145, 145);

        // canvas size (Variable aren't evaluated. Integers only, please.)
        size(318, (568 - 20 - 44));

        // smooth edges
        smooth();

        // limit the number of frames per second
        frameRate(30);

        // set the width of the line. 
        strokeWeight(1);


        //array for whitelines
        for (int a = 0; a < 100; a++) {
                lineY[a] = (0);
                lineY[a] = (width / 2);
        }

        // the arrayassignement for the speed of the ball in form of a for looop
        for (int b = 0; b < 20; b++) {
                speed = 2;
        }

        //first values for integer variables
        leftlane = width / 6;
        hightlane = height / 2;
        rightlane = 4 * width / 6;
        obstacle1y = round(random(-100, -1000));
        obstacle2y = round(random(-500, -2000));
        scoreboostery = round(random(-4000, -2000));
        speed = 0;
        obstaclehwidth = 40;
        obstacleheight = 40;
        scorepointy = 0;
        carlane = rightlane;
        carheight = hightlane;
        endofscreen = (height + height / 2);
        bluecarX = leftlane;
        redcarX = width / 2 - 25;
        greencarX = rightlane;


        //imgages
        img = loadImage("carpicture3.png");
        img2 = loadImage("carpicture4.png");
        img3 = loadImage("carpicture5.png");
        obstacle1img = loadImage("obstacle1picture2.png");
        obstacle2img = loadImage("obstacle2picture3.png");
        pointboosterimg = loadImage("pointboosterpicture1.png");
        explotionimg = loadImage("explotionpicture1.png");



}

//setting up the new array for lineY
int[] lineY = new int[100];

//Setting up new integer varibles
int speed;
//for arrayvalues
int aa;
int bb;
//locations
int carlane;
int carheight;
int leftlane;
int hightlane;
int rightlane;
int obstacle1y;
int obstacle2y;
int carcrash;
int obstaclehwidth;
int obstacleheight;
int scorepointy;
int scoreboostery;
int endofscreen;
int carcolor;
int bluecarX;
int redcarX;
int greencarX;
PImage img;
PImage img2;
PImage img3;
PImage obstacle1img;
PImage obstacle2img;
PImage pointboosterimg;
PImage explotionimg;





void draw() {



        background(122, 122, 122);
        fill(255, 255, 255);

        //score
        fill(255, 255, 255);
        text(0 + scorepointy, 20, 40);

        //scorepoint
        point(0, scorepointy);
        scorepointy = scorepointy + speed;


        //the for loop writes the lines depending on var a
        for (int a = 0; a < 100; a++) {
                rect(width / 2, lineY[a] + 100 * a, 10, 20);

                lineY[a] = lineY[a] + speed;

        }
        // When the wite lines leave the screen this comand makes them appear at the top again
        for (int a = 0; a < 100; a++) {
                if (lineY[a] > height - (height - 80)) {
                        lineY[a] = -20;
                }

        }


        if (speed == 0) {
                image(img, bluecarX, carheight, 60, 90);
                image(img2, redcarX, carheight, 60, 90);
                image(img3, greencarX, carheight, 60, 90);
        }

        //carpicture
        //THIS  IS WHERE CAR IMAGE SHOULD BE
        if (carcolor == 1) {
                image(img, carlane, carheight, 60, 90);
        }
        if (carcolor == 2) {
                image(img2, carlane, carheight, 60, 90);
        }
        if (carcolor == 3) {
                image(img3, carlane, carheight, 60, 90);
        }



        //carspeed
        if (scorepointy > 0 && scorepointy < 200) {
                speed = 2;
        }
        if (scorepointy > 200 && scorepointy < 600) {
                speed = 4;
        }
        if (scorepointy > 600 && scorepointy < 1500) {
                speed = 6;
        }
        if (scorepointy > 1500 && scorepointy < 5000) {
                speed = 8;
        }
        if (scorepointy > 5000 && scorepointy < 10000) {
                speed = 10;
        }
        if (scorepointy > 10000 && scorepointy < 20000) {
                speed = 12;
        }
        if (scorepointy > 20000 && scorepointy < 30000) {
                speed = 14;
        }
        if (scorepointy > 30000 && scorepointy < 40000) {
                speed = 16;
        }
        if (scorepointy > 40000 && scorepointy < 50000) {
                speed = 18;
        }
        if (scorepointy > 50000 && scorepointy < 70000) {
                speed = 20;
        }
        if (scorepointy > 70000) {
                speed = 24;
        }


        //obstacle1
        image(obstacle1img, leftlane + 25, obstacle1y, obstaclehwidth, obstacleheight);

        // the speed of the obstacle1
        obstacle1y = obstacle1y + speed;

        //move ob1 from bottom of screen to top
        if (obstacle1y > endofscreen) {
                obstacle1y = round(random(-1000, -180));

                ////println("beforewhileloop2: " + "   obstacle1y: " + obstacle1y + "   obctacle2y: " + obstacle2y);
                //ob 1 can't end up within 180 of 0b2
                while ((obstacle1y < (obstacle2y + 180) && obstacle1y > (obstacle2y - 180))) {
                        obstacle1y = round(random(-1000, -180));

                        ////println("whileloop2: " + "   obstacle1y: " + obstacle1y + "   obctacle2y: " + obstacle2y);
                }

        }

        //obstacle 2
        image(obstacle2img, rightlane + 25, obstacle2y, obstaclehwidth, obstacleheight);

        // the speed of the obstacle
        obstacle2y = obstacle2y + speed;

        //move ob2 from bottom to top
        if (obstacle2y > endofscreen) {

                //ob2 can't end up withing 180 of ob1
                obstacle2y = round(random(-1000, -20));

                ////println("beforewhileloop1: " + "   obstacle1y: " + obstacle1y + "   obctacle2y: " + obstacle2y);
                //while loop for giving obstacle 2 a new value
                while ((obstacle2y < (obstacle1y + 180) && obstacle2y > (obstacle1y - 180))) {
                        obstacle2y = round(random(-1000, -180));

                        ////println("whileloop1: " + "   obstacle1y: " + obstacle1y + "   obctacle2y: " + obstacle2y);
                }
        }


        // obstacle1 + car crash = restart pinot counting
        // ////println("obctacle1y " + obstacle1y); 
        if (obstacle1y > carheight && obstacle1y < (hightlane + 90) && carlane == leftlane) {
                carcrash = 1;
        }

        // ////println("obctacle2y " + obstacle2y); 
        // obstacle2 + car crash = restart pinot counting
        if (obstacle2y > carheight && obstacle2y < (hightlane + 90) && carlane == rightlane) {
                carcrash = 2;
        }

        // what happends when it crashes
        if (carcrash == 1 || carcrash == 2) {
                fill(255, 10, 10);
                rect(width / 4, height / 4, width / 2, 100);

                textSize(28);
                fill(0, 0, 0);
                textAlign(CENTER);
                text("Game Over", width / 2, height / 4 + 60);
                fill(255, 255, 255);
                text(scorepointy, width / 2, height / 4 + 95);

                image(explotionimg, carlane, carheight, 60, 60);

                //game stops
                speed = 0;

                //obstacle squeezes
                obstacleheight = 20;

                ////println("final values: " + "   obstacle1y: " + obstacle1y + "   obstacle2y: " + obstacle2y);
                noLoop();

        }


        //scoretbooster
        image(pointboosterimg, rightlane + 25, scoreboostery, 20, 20);

        scoreboostery = scoreboostery + speed;

        //catch scorebooster
        if (scoreboostery > carheight && scoreboostery < (hightlane + 90) && carlane == rightlane) {
                scoreboostery = round(random(-4000, -2000));
                scorepointy = scorepointy + 1000;
        }

        if (scoreboostery > (height + 10)) {
                scoreboostery = round(random(-4000, -2000));
        }


}



void keyPressed() {


        if (keyCode == 49) {
                carcolor = 1;
        }

        if (keyCode == 50) {
                carcolor = 2;
        }
        if (keyCode == 51) {
                carcolor = 3;
        }

        //move car
        ////println(keyCode + " carlane=" + carlane + " carheight=" + carheight + " leftlane=" + leftlane + " hightlane=" + hightlane);
        if (keyCode == LEFT) {
                carlane = leftlane;
                carheight = hightlane;
        }
        if (keyCode == RIGHT) {
                carlane = rightlane;
                carheight = hightlane;
        }

        if (keyCode == 'O') {
                obstacle1y = 100;
        }

        if (keyCode == 'S') {
                noLoop();
        }

        if (keyCode == 'A') {
                loop();
        }
}

void mouseClicked() {

        if (mouseButton == LEFT && mouseX < width / 2 && mouseY > 200) {
                carlane = leftlane;
                carheight = hightlane;
        }


        if (mouseButton == LEFT && mouseX > width / 2 && mouseY > 200) {
                carlane = rightlane;
                carheight = hightlane;
        }

        if (mouseButton == LEFT && mouseX > width / 2 && mouseY < 200) {
                noLoop();

        }

        if (mouseButton == LEFT && mouseX < width / 2 && mouseY < 200) {
                loop();
        }


        if (speed == 0) {

                if (mouseButton == LEFT && mouseX < leftlane + 60 && mouseY > carheight - 50) {
                        carcolor = 1;
                        speed = 1;
                }

                if (mouseButton == LEFT && mouseX > width / 2 - 30 && mouseX < width / 2 + 30 && mouseY > carheight - 50) {
                        carcolor = 2;
                        speed = 1;
                }

                if (mouseButton == LEFT && mouseX > rightlane - 30 && mouseY > carheight - 50) {
                        carcolor = 3;
                        speed = 1;
                }
        }


}
