package com.firebase_invertase;

import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetectorOptions;

import java.io.File;
import java.io.IOException;

public class FirebaseMLKit extends ReactContextBaseJavaModule  {

    FirebaseMLKit(ReactApplicationContext context) {
        super(context);
       // reactContext = context;
    }

    // High-accuracy landmark detection and face classification
    FirebaseVisionFaceDetectorOptions highAccuracyOpts =
            new FirebaseVisionFaceDetectorOptions.Builder()
                    .setPerformanceMode(FirebaseVisionFaceDetectorOptions.ACCURATE)
                    .setLandmarkMode(FirebaseVisionFaceDetectorOptions.ALL_LANDMARKS)
                    .setClassificationMode(FirebaseVisionFaceDetectorOptions.ALL_CLASSIFICATIONS)
                    .build();

    // Real-time contour detection of multiple faces
    FirebaseVisionFaceDetectorOptions realTimeOpts =
            new FirebaseVisionFaceDetectorOptions.Builder()
                    .setContourMode(FirebaseVisionFaceDetectorOptions.ALL_CONTOURS)
                    .build();

    //get the string name of the native module
    @Override
    public String getName() {
        return "FaceDetector";
    }

    @ReactMethod
    public void detectFace(String path, Callback errorCallback,
                           Callback successCallback) {
        if(path.length()!= 0 ) {
            successCallback.invoke(22, 33, 44,66);
        }
        else{
        errorCallback.invoke("error occured");
        }

        Uri uri = Uri.fromFile(new File(path));
    }
}

