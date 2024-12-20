export const DetailCompareFlagComponent = ({ detail, countryA, countryB }) => {
  return (
    <tr>
      <td className="mt-1">
        <img
          src={countryA.flags.png}
          alt={countryA.name.common}
          className="img-fluid shadow-lg"
          style={{ objectFit: "fill", width: "50%", height: "50%" }}
        />
      </td>
      <td className="mt-1" style={{ fontWeight: "bolder" }}>
        {detail}
      </td>
      <td className="mt-1">
        <img
          src={countryB.flags.png}
          alt={countryB.name.common}
          className="img-fluid"
          style={{ objectFit: "fill", width: "50%", height: "50%" }}
        />
      </td>
    </tr>
  );
};
