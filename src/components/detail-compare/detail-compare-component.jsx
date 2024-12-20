export const DetailCompareComponent = ({ detail, countryA, countryB, styleFw }) => {
    return (
      <tr>
        <td className="mt-1 text-center fw-medium" >{countryA}</td> 
        <td className="mt-1 text-center h5" style={{ fontWeight: 'bolder' }}>{detail}</td>
        <td className="mt-1 text-center fw-medium" >{countryB}</td>
      </tr>
    );
  };