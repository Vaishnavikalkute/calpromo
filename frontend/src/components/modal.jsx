import React from "react";


const modalOverlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000, // Ensures modal appears above other elements
  };
  
  const modalStyles = {
    background: "black",
  color: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  width: "40vw",
  minHeight: "30vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Ensures content is spaced well
  alignItems: "center",
  position: "relative",
  };
  
  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",

    color: "white",
    border: "none",

    width: "30px",
    height: "3px",
    fontSize: "16px",
    cursor: "pointer",
  };

const modal=({canShow,updateModalState ,children})=>{
    if(canShow){
        return (
            <div style={modalOverlayStyles} onClick={updateModalState }> 
                <div style={modalStyles} onClick={(e)=>e.stopPropagation()}>
                    
                    <span style={closeButtonStyles} onClick={updateModalState }>X</span>
                    {/* model content */}
                    {children}
                </div>
            </div>
        )
    }
    return null
}

export default modal;