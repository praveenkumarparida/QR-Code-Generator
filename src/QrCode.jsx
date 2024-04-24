import { useState } from "react"

const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading, setLoading] = useState(false);
    const [qrData,setQrData]=useState("");
    const [qrSize,setQrSize]=useState("150");

    async function generateQr(){
        setLoading(true);
        try {
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.log("Error generating QR code",error);
        } finally{
            setLoading(false);
        }
    }
    function downloadQr(){
        fetch(img)
            .then((response)=>response.blob())
            .then((blob)=>{
                const link=document.createElement("a");
                link.href=URL.createObjectURL(blob);
                link.download=`${qrData}_qrcode.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((e)=>{
                console.log("Error downloading QR code",e);
            })
    }

  return (
    <div className="app-container">
    <h1>QR Code Generator</h1>
    {loading && <p>Please wait...</p>}
    {img && <img src={img} className="qr-code-image" />}
    <div>
        <label htmlFor="dataInput" className="input-label">Data for QR Code:</label>
        <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR Code" onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor="sizeInput" className="input-label">Image Size (eg., 150)</label>
        <input type="text" id="sizeInput" value={qrSize} placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)}/>
        <button className="generate-button" disabled={loading} onClick={generateQr}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQr}>Download QR Code</button>
    </div>   
    <p className="footer">Designed By PKP</p>  
    </div>
  )
}

export default QrCode
