package com.carrot.timeode.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class PageDTO implements Serializable {
    private Integer page;
    private Integer size;

}
