package com.vladhacksmile.springbackend.utils;

import com.vladhacksmile.springbackend.requests.PointRequest;

public class PointUtils {

    public static boolean isRectangleTrigger(float x, float y, float r) {
        return x <= r  && x >= 0 && y <= r && y >= 0;
    }

    public static boolean isCircleTrigger(float x, float y, float r) {
        return (Math.pow(x, 2) + Math.pow(y, 2)) <= ((Math.pow(r, 2))) / 4 && (x <= 0) && (y >= 0);
    }

    public static boolean isTriangleTrigger(float x, float y, float r) {
        return x >= 0 && y <= 0 && (r + r / 10 - x >= -2 * y);
    }

    public static boolean isBelong(float x, float y, float r) {
        return isRectangleTrigger(x, y, r) || isCircleTrigger(x, y, r) || isTriangleTrigger(x, y, r);
    }

    public static boolean validate(PointRequest pointRequest) {
        return (pointRequest.getX() >= -5 && pointRequest.getX() <= 5) && (pointRequest.getY() >= -5 && pointRequest.getY() <= 5) && (pointRequest.getR() > 0 && pointRequest.getR() <= 5);
    }
}
