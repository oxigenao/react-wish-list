import React, { useState, useContext, useRef } from "react";
import "./WishCard.scss";
import {
  IonCard,
  IonInput,
  IonIcon,
  IonButton,
  IonCheckbox,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { Wish } from "../../../../models/wish";
import { trashBinOutline, closeSharp } from "ionicons/icons";
import { WisherContext } from "../WishListViwer/WishListViwer";

function WishCard(props: { wishElement: Wish }) {
  const [editable, setEditable] = useState(false);
  const dispatch = useContext(WisherContext);
  const itemRef: any = useRef(null);

  return (
    <IonItemSliding ref={itemRef}>
      <IonItem lines="none">
        <div
          className={
            "wish-card " + (props.wishElement.done && "wish-card-disabled")
          }
        >
          <IonButton
            fill="clear"
            onClick={(ev) => {
              dispatch({
                type: "update",
                payload: {
                  ...props.wishElement,
                  done: !props.wishElement.done,
                },
              });
            }}
          >
            <div
              className={"mark " + (props.wishElement.done && "disable-mark")}
            ></div>
          </IonButton>
          <div className="content">
            {!editable && (
              <div
                className="default-content"
                onDoubleClickCapture={(ev) => {
                  setEditable(true);
                }}
              >
                <p className="title">
                  <b>{props.wishElement.name}</b>
                </p>
              </div>
            )}
            {editable && (
              <div className="editable-content">
                <IonInput
                  style={{ height: "16px", textAlign: "left" }}
                  onIonBlur={(ev: any) => {
                    dispatch({
                      type: "update",
                      payload: {
                        ...props.wishElement,
                        name: ev.srcElement.value,
                      },
                    });
                    setEditable(false);
                  }}
                  value={props.wishElement.name}
                ></IonInput>
              </div>
            )}

            <br></br>
            <span>
              {props.wishElement.url && (
                <a
                  className="action-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={props.wishElement.url}
                >
                  <span role="img" aria-label="web">
                    🌐
                  </span>
                </a>
              )}
            </span>
          </div>
        </div>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          onClick={() => {
            itemRef.current.close();
            dispatch({ type: "delete", payload: props.wishElement.timeStamp });
          }}
        >
          <IonIcon icon={closeSharp}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}

export default WishCard;
