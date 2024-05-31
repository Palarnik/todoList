package com.palarnik.todoList

import android.content.Intent
import androidx.core.content.ContextCompat.startActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class NativeIntentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    // add to CalendarModule.kt
    override fun getName() = "NativeIntentModule"

    @ReactMethod fun shareFinishedTask(name: String) {
        val sendIntent = Intent()
        sendIntent.setAction(Intent.ACTION_SEND)
        sendIntent.putExtra(Intent.EXTRA_TEXT, "Cześć! Udało mi się ukończyć następujące zadanie: $name")
        sendIntent.setType("text/plain")

        val shareIntent = Intent.createChooser(sendIntent, null)
        startActivity(reactApplicationContext, shareIntent, null)
    }

}