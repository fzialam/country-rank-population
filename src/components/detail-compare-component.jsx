export const DetailCompareComponent = ({ detail, countryA, countryB, styleFw }) => {
  return (
    <tr>
      <td className="mt-1 text-center" style={{ fontWeight: styleFw }}>{countryA}</td> 
      <td className="mt-1 text-center" style={{ fontWeight: 'bolder' }}>{detail}</td>
      <td className="mt-1 text-center" style={{ fontWeight: styleFw }}>{countryB}</td>
    </tr>
  );
};
