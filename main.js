console.log("Hello!");
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song=loadSound("Psych Theme.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded!");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score is "+scoreLeftWrist+"Right Wrist Score is "+scoreRightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y "+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    fill("#00fff7");
    stroke("#691603");
    
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX, rightWristY,20);
    
        if(rightWristY>0 && rightWristY<=100)
        {
            document.getElementById("speed").innerHTML="Speed is 0.5x";
            song.rate(0.5);
        }

        else if(rightWristY>100 && rightWristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed is 1x";
            song.rate(1);
        }

        else if(rightWristY>200 && rightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed is 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY>300 && rightWristY<=400)
        {
            document.getElementById("speed").innerHTML="Speed is 2x";
            song.rate(2);
        }

        else if(rightWristY>400 && rightWristY<=500)
        {
            document.getElementById("speed").innerHTML="Speed is 2.5x";
            song.rate(2.5);
        }
    }
    

    if (scoreLeftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 20);
        ValueLeftWristY= Number(leftWristY);
        nodecimals= floor(ValueLeftWristY);
        volume=nodecimals/500;
        document.getElementById("volume").innerHTML="Volume is "+volume;
        song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(2);  
    song.rate(1);
}

function pause()
{
    song.pause();
}

function playFromBeginning()
{
    song.stop();
    song.play();
}