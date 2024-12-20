export const DetailCompareComponent = ({ detail, countryA, countryB, styleFw }) => {
    return (
      <tr>
        <td className="mt-1 fw-medium" >{countryA}</td> 
        <td className="mt-1 h5" style={{ fontWeight: 'bolder' }}>{detail}</td>
        <td className="mt-1 fw-medium" >{countryB}</td>
      </tr>
    );
  };