import React, { useState } from "react"
import styled from "styled-components"
import ImageBox from "./ImageBox"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const ImageUploads = () => {
  const [boxes, setBoxes] = useState([
    { id: "1", imageSrc: "" },
    { id: "2", imageSrc: "" },
    { id: "3", imageSrc: "" },
    { id: "4", imageSrc: "" },
    { id: "5", imageSrc: "" },
    { id: "6", imageSrc: "" },
  ])

  const handleImageRemove = (id) => {
    setBoxes((boxes) => {
      let tempBoxes = boxes.filter((item) => item.id !== id)
      tempBoxes.push({ id: id + id, imageSrc: "" })
      return tempBoxes
    })
  }

  const handleImageChange = (event, id) => {
    if (!event.target.files.length) {
      let tempBoxes = boxes.filter((item) => item.id !== id)
      tempBoxes.push({ id, imageSrc: "" })
      setBoxes(tempBoxes)
      return
    }

    let fr = new FileReader()
    fr.onloadend = function (event) {
      let imageSrc = event.target.result
      let tempBoxes = boxes.filter((item) => item.id !== id)
      for (let i = 0; i < tempBoxes.length; i++) {
        // if box has image url then go to next
        if (tempBoxes[i]["imageSrc"]) {
          continue
        } else {
          // if current index does not have image already insert image here and break
          tempBoxes.splice(i, 0, { id, imageSrc })
          break
        }
      }

      // if tempboxes length is less than 6(exactly 5) then we need to insert 6 the element
      if (tempBoxes.length === 5) {
        tempBoxes.push({ id, imageSrc })
      }

      setBoxes(tempBoxes)
    }

    fr.readAsDataURL(event.target.files[0])
  }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          textDecoration: "underline",
          color: "#3F51B5",
        }}
      >
        Uploads
      </h1>
      <Container>
        {boxes.map((item) => (
          <div key={item.id}>
            <label>
              <ImageBox
                imageSrc={item.imageSrc}
                handleImageRemove={handleImageRemove}
                id={item.id}
              />
              <input
                id={item.id}
                type="file"
                style={{ display: "none" }}
                onChange={(event) => handleImageChange(event, item.id)}
                accept="image/*"
              />
            </label>
          </div>
        ))}
      </Container>
    </>
  )
}

export default ImageUploads
