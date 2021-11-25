import React, { useEffect, useRef, useState } from 'react';
import "./style.css";

const ImageUpload = (props) => {
    const {onPress}  =props;
    const fileupolad = useRef();
    const [file, setFile] = useState()
    const [preview, setPreview] = useState('');
    const [isvalid, setIsvalid] = useState(false);

    useEffect(()=>{
        onPress(props.id, file, isvalid)
    },[file, isvalid,onPress,props.id])

    useEffect(()=>{
        if(!file){
            return
        }
        var reader = new FileReader();
        reader.onload = function () {
        setPreview(reader.result)

    };
    reader.readAsDataURL(file);
    },[file])
    const filePickHandler = () => {
        console.log(fileupolad)
        fileupolad.current.click()
    };
    const previewHandler = (event) => {
        if(event.target.files) {
           setFile( event.target.files[0]);
           setIsvalid(true);
            
        }else{
            setIsvalid(false)
        }

       }

    
    return (
        <>
            <div className="form-control">
                <input
                    type="file"
                    name="file"
                    id="fileupload"
                    style={{ display: "none" }}
                    ref={fileupolad}
                    onChange={previewHandler}
                    accept=".jpg,.png"

                />
                {preview && <div className="imagePreview">
                    <img src={preview} alt="alert" />
                </div>}
                {!isvalid && <p>please select image</p>}
                <button className= "uploadbtn" onClick={filePickHandler}>UPLOADING</button>
            </div>
        </>

    );

};

export default ImageUpload;