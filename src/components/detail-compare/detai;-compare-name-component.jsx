import { useState } from "react";
import { PopupDetailComponent } from "../pop-up-detail-component";

export const DetailCompareNameComponent = ({
  detail,
  countryA,
  countryB,
}) => {
  const [popUp, setPopUp] = useState(false);
  const [clicked, setClicked] = useState();
  return (
    <>
    <tr className="text-center fw-bolder h4 border border-bottom-100">
      <td className="mt-1 fw-medium">
        {
          <a
            className="fw-medium"
            onClick={() => {
              setClicked(countryA.cca3);
              setPopUp(true);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {countryA.name.common}
          </a>
        }
      </td>
      <td className="mt-1 h5" style={{ fontWeight: "bolder" }}>
        {detail}
      </td>
      <td className="mt-1 fw-medium">
        {
          <a
            className="fw-medium"
            onClick={() => {
              setClicked(countryB.cca3);
              setPopUp(true);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {countryB.name.common}
          </a>
        }
      </td>
    </tr>
      {popUp && (
        <PopupDetailComponent data={clicked} onClose={() => setPopUp(false)} />
      )}
    </>
  );
};
