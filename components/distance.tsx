const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

export default function Distance({ leg }: DistanceProps) {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );

  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  console.log(leg);
  return (
    <div>
      <p>
        This home is <span className="highlight">{leg.distance.text}</span> from
        your office. That would take <span className="highlight">{leg.duration.text}</span>
      </p>
      <p>
        That{"'"}s <span className="highlight">{days}</span> in your each day at a cost of <span className="highlight">{new Intl.NumberFormat().format(cost)}</span>
      </p>
    </div>
  );
}
