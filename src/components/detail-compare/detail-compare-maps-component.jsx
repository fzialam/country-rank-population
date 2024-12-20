import openStreet from '../../assets/img/openstreetmap-svgrepo-com.svg'
import googleMap from '../../assets/img/google-maps-platform-svgrepo-com.svg'

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
          <img src={googleMap} height={"30"} width={"30"} alt="" />
        </a>
        <a
          href={countryA.maps.openStreetMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={openStreet} height={"30"} width={"30"} alt="" />
        </a>
      </td>
      <td className="mt-1 text-center h5" style={{ fontWeight: "bolder" }}>
        {detail}
      </td>
      <td>
        <a
          href={countryB.maps.googleMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={googleMap} height={"30"} width={"30"} alt="" />
        </a>
        <a
          href={countryB.maps.openStreetMaps}
          className="mx-1"
          target={"_blank"}
          style={{ cursor: "pointer" }}
        >
          <img src={openStreet} height={"30"} width={"30"} alt="" />
        </a>
      </td>
    </tr>
  );
};
