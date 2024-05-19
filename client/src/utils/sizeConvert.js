// src/utils/timeUtils.js

export const sizeConvert = (size) => {
    // alert(size)
    if(size == null){
        size=0
    }
    if(size >= 102400)
        return (size/(1024*1024)).toFixed(4)+" MB"

    if(size >=1024 && size < 102400){
        return (size/1024).toFixed(4)+" KB"
    }
    if(size <1024){
        return (size).toFixed(4)+" Bytes"
    }
  };
  