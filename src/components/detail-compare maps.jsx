import openStreet from '../assets/img/map-svgrepo-com.svg'
import googleMap from '../assets/img/map-pin-svgrepo-com.svg'

export const DetailCompareMapsComponent = ({ detail, countryA, countryB }) => {
  return (
    <tr>
      <td>
        <a
          href={countryA.maps.googleMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={googleMap} height={"20"} width={"20"} alt="" />
        </a>
        <a
          href={countryA.maps.openStreetMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={openStreet} height={"20"} width={"20"} alt="" />
        </a>
      </td>
      <td className="mt-1 text-center" style={{ fontWeight: "bolder" }}>
        {detail}
      </td>
      <td>
        <a
          href={countryB.maps.googleMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={googleMap} height={"20"} width={"20"} alt="" />
        </a>
        <a
          href={countryB.maps.openStreetMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={openStreet} height={"20"} width={"20"} alt="" />
        </a>
      </td>
    </tr>
  );
};
