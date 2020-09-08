import React from "react"
import styled from "styled-components"

const Box = styled.div`
  position: relative;
  margin: 50px 10px 10px 10px;
  width: 200px;
  height: 200px;
  background-color: #bdc3c7;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  border: ${(props) => (props.imageSrc ? "5px solid #d35400" : "none")};
  .cross {
    visibility: ${(props) => (props.imageSrc ? "visible" : "hidden")};
  }
  &:hover {
    border: 5px solid #d35400;
  }
  &:hover .cross {
    visibility: visible;
  }
`

const Cross = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: -12px;
  top: -12px;
  border: 4px solid #d35400;
`

const ClickToUploadMessage = styled.div`
  padding-top: 80px;
  color: white;
`

const ImageBox = (props) => {
  return (
    <>
      <Box {...props}>
        {props.imageSrc ? (
          <>
            <Cross
              className="cross"
              onClick={(event) => {
                event.preventDefault()
                props.handleImageRemove(props.id)
              }}
            >
              x
            </Cross>
            <img
              src={props.imageSrc}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={"preview"}
            />
          </>
        ) : (
          <ClickToUploadMessage>click to upload</ClickToUploadMessage>
        )}
      </Box>
    </>
  )
}

export default ImageBox
