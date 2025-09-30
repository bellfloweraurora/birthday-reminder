package com.carrot.timeode.vo;

import lombok.Data;

import java.io.Serializable;
@Data
public class ResponseEntity<T> implements Serializable {
    /**
     * 是否成功
     */
    private Boolean success;
    /**
     * 提示信息
     */
    private String message;
    /**
     * 状态码
     */
    private String code;
    /**
     *  数据
     */
    private T data;
    public static <T> ResponseEntity<T> success(T data){
        ResponseEntity response = new ResponseEntity<T>();
        response.success=true;
        response.data=data;
        response.code="200";
        return response;
    }
    public static <T> ResponseEntity<T> success(){
        return success(null);
    }
    public static <T> ResponseEntity<T> fail(T data,String message){
        ResponseEntity response = new ResponseEntity<T>();
        response.success=false;
        response.data=data;
        response.code="500";
        response.message=message;
        return response;
    }
    public static <T> ResponseEntity<T> fail(){
        return fail(null);
    }
    public static <T> ResponseEntity<T> fail(String message){
        return fail(null,message);
    }
}
