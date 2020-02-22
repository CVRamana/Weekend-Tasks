package com.firebase_invertase;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.net.Uri;
import android.os.ParcelFileDescriptor;

import androidx.annotation.NonNull;

import java.io.ByteArrayOutputStream;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.util.ArrayList;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.ml.vision.FirebaseVision;
import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.face.FirebaseVisionFace;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetector;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetectorOptions;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class FirebaseMLKit extends ReactContextBaseJavaModule  {
    List<String> aList = new ArrayList<String>();

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
        return "FaceDetectorAndroid";
    }

    private void uriToBitmap(Uri selectedFileUri) {
        try {
            ParcelFileDescriptor parcelFileDescriptor =
                    getCurrentActivity().getContentResolver().openFileDescriptor(selectedFileUri, "r");
            FileDescriptor fileDescriptor = parcelFileDescriptor.getFileDescriptor();
            Bitmap img = BitmapFactory.decodeFileDescriptor(fileDescriptor);


            FirebaseVisionImage image = FirebaseVisionImage.fromBitmap(img);

            FirebaseVisionFaceDetector detector = FirebaseVision.getInstance()
                    .getVisionFaceDetector(highAccuracyOpts);

            Task<List<FirebaseVisionFace>> result =
                    detector.detectInImage( image )
                            .addOnSuccessListener(
                                    new OnSuccessListener<List<FirebaseVisionFace>>() {
                                        @Override
                                        public void onSuccess(List<FirebaseVisionFace> faces) {
                                            // Task completed successfully
                                            // ...
                                            for (FirebaseVisionFace face : faces) {
                                                Rect bounds = face.getBoundingBox();

                                                FirebaseMLKit.this.cropImage32(img,bounds);
                                                System.out.println("bound in android are : "+bounds);
                                                float rotY = face.getHeadEulerAngleY();  // Head is rotated to the right rotY degrees
                                                float rotZ = face.getHeadEulerAngleZ();
                                            }
                                        }
                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            // Task failed with an exception
                                            // ...
                                        }
                                    });
            parcelFileDescriptor.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void cropImage22(Bitmap src,Rect rect){
        Bitmap output = Bitmap.createBitmap(src.getWidth(), src.getHeight(),
              //  Bitmap.Config.ARGB_8888
                Bitmap.Config.ARGB_8888
        );
        Canvas canvas = new Canvas(output);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setColor(0Xff000000);
        Path path = new Path();
        path.addRect(rect.left, rect.top, rect.right, rect.bottom, Path.Direction.CW);
        canvas.drawPath(path, paint);
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
        canvas.drawBitmap(src, rect.left,rect.top, paint);
        try
        {
            File f = new File(getCurrentActivity().getCacheDir(), Calendar.getInstance().getTimeInMillis() + "raman"+".png");
            f.createNewFile();

//Convert bitmap to byte array
            Bitmap bitmap = output;
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 0/*ignored for PNG*/, bos);
            byte[] bitmapdata = bos.toByteArray();

//write the bytes in file
            FileOutputStream fos = new FileOutputStream(f);
            fos.write(bitmapdata);
            fos.flush();
            fos.close();

            aList.add(f.getPath());
            System.out.println("saved path : "+aList.toString());
        }
        catch (IOException e){
            e.printStackTrace();
        }
      //  return output;
    }


    //testing
    public void cropImage32(Bitmap src,Rect rect){
       Bitmap dup = Bitmap.createBitmap(src);
        Bitmap output = dup.copy(Bitmap.Config.ARGB_8888, true);
        //Bitmap output = Bitmap.createScaledBitmap(src,src.getWidth(),src.getHeight(),true);
        Rect dst= new Rect(0,0,src.getHeight(),src.getWidth());
        Canvas canvas = new Canvas(output);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setColor(0Xff000000);
        Path path = new Path();
        path.addRect(rect.left, rect.top, rect.right, rect.bottom, Path.Direction.CW);
        canvas.drawPath(path, paint);
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
        //canvas.drawBitmap(src, 0,0, paint);
        canvas.drawBitmap(src,rect,dst,paint);

        try
        {
            File f = new File(getCurrentActivity().getCacheDir(), Calendar.getInstance().getTimeInMillis() + "raman"+".png");
            f.createNewFile();

//Convert bitmap to byte array
            Bitmap bitmap = output;
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 1/*ignored for PNG*/, bos);
            byte[] bitmapdata = bos.toByteArray();

//write the bytes in file
            FileOutputStream fos = new FileOutputStream(f);
            fos.write(bitmapdata);
            fos.flush();
            fos.close();
            aList.add(f.getPath());
            System.out.println("saved path : "+aList.toString());
        }
        catch (IOException e){
            e.printStackTrace();
        }
        //  return output;
    }



    @ReactMethod
    public void deleteFile( Callback successCallback,Callback errorCallback){

        for (String f: aList){
            File file = new File( f);
            boolean deleted = file.delete();
            if(deleted==true){
                aList.remove(f);
                successCallback.invoke("success");
            }else{
                errorCallback.invoke("not deleted");
            }
        }

    }

    @ReactMethod
    public void detectFace(String path, Callback successCallback, Callback errorCallback) {
        if(path.length()!= 0 ) {
            System.out.println("path "+path);
            Uri u= Uri.parse(path);
            System.out.println("bound in a"+u);

           // converting the uriToBitmap

            this.uriToBitmap(u);
            //sending the array as callback
            WritableArray array = Arguments.fromList(aList);
            successCallback.invoke(array);
        }
        else{
        errorCallback.invoke("error occured");
        }
    }
}

