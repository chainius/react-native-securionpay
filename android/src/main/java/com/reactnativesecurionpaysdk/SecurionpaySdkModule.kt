package com.reactnativesecurionpay

import com.securionpay.SecurionPay
import com.facebook.react.bridge.*
import com.google.gson.Gson
import com.securionpay.data.api.Status
import com.securionpay.data.model.token.Token
import com.securionpay.data.model.token.TokenRequest

class SecurionpayModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Securionpay"
    }


    private lateinit  var securionPay: SecurionPay
    private var initialised: Boolean = false

    @ReactMethod
    fun Init(publickey: String, signature: String) {
        this.initialised = true
        securionPay = SecurionPay(
          this.reactApplicationContext,
          publickey,
          signature,
          listOf("com.google.android.packageinstaller")
        )
     }

     @ReactMethod
     fun LaunchPaymentWithToken(token: String ,amount: Int , currency :String , promise: Promise ) {
       var gson = Gson()
       var tk = gson?.fromJson(token, Token::class.java)
       if(tk == null) {
           val resultData: WritableMap = WritableNativeMap()
           resultData.putString("error","failed to parse token")
           resultData.putString("token_string", token)
           promise.reject("TOKEN_PARSING", "failed to parse token", resultData)
       } else {
          RunAuthentication(tk!!, amount, currency, promise)
       }

     }

    fun RunAuthentication(token: Token, amount: Int , currency :String , promise: Promise) {
        securionPay.authenticate(
          token!!,
          amount,
          currency,
          this.currentActivity!!
        ) { authenticatedToken ->
          when (authenticatedToken.status) {
            Status.SUCCESS -> {
              val data = authenticatedToken.data
              promise.resolve(GetResult(data))
            }
            Status.ERROR -> {
              val resultData: WritableMap = WritableNativeMap()
              resultData.putString("error",authenticatedToken.error.toString())
              promise.reject("AUTH_FAILED",authenticatedToken.error.toString(),resultData)
            }
          }
        }
    }
     @ReactMethod
     fun LaunchPayment(cardnumber : String, expirymonth : String, expiryyear : String, cvv : String, amount: Int , currency :String , promise: Promise){

         if(!this.initialised){
           return promise.reject("NOT_INITIALISED", "Please run Init(publickeu , signature) first")
         }

         val token  =   TokenRequest(
           cardnumber,
           expirymonth,
           expiryyear,
           cvv
         )

         val resultData: WritableMap = WritableNativeMap()

         securionPay.createToken(token){
             token ->
           when (token.status) {
             Status.SUCCESS -> {
               RunAuthentication(token.data!! , amount, currency, promise)
             }
             Status.ERROR -> {
               resultData.putString("error",token.error.toString())
               promise.reject("TOKEN_CREATION",token.error.toString(),resultData)
             }

           }
         }
    }





    fun GetResult(data: Token?): WritableMap {
      val resultData: WritableMap = WritableNativeMap()

      if(data == null){
        resultData.putBoolean("canceled", true)
        return resultData
      }

      resultData.putBoolean("canceled", false)
      resultData.putString("id",data.id)
      resultData.putString("brand", data.brand)
      resultData.putString("country", data.country)
      resultData.putString("fingerprint", data.fingerprint)
      resultData.putString("cardholder", data.cardholder)
      resultData.putString("expirationMonth", data.expirationMonth)
      resultData.putString("expirationYear", data.expirationYear)
      resultData.putString("expirationYear", data.expirationYear)
      resultData.putString("first6", data.first6)
      resultData.putString("last4", data.last4)
      resultData.putString("objectType", data.objectType)
      resultData.putString("type", data.type)

      data.created?.let { resultData.putInt("created", it) }
      if(data.threeDSecureInfo != null){
        val threeD: WritableMap = WritableNativeMap()
        threeD.putString("currency", data.threeDSecureInfo!!.currency)
        threeD.putString("version", data.threeDSecureInfo!!.version)
        threeD.putString("liabilityShift", data.threeDSecureInfo!!.liabilityShift)
        threeD.putInt("amount", data.threeDSecureInfo!!.amount)
        threeD.putBoolean("enrolled", data.threeDSecureInfo!!.enrolled)
        resultData.putMap("threeDSecureInfo", threeD)
      }


      return resultData
    }

}


