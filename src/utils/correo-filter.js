const daysBetween = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24));

const findTrips = ({ dataset, budget, passengers, origin, destination, minDays, maxDays }) => {
  const flights = dataset.map(f => ({ ...f, dateObj: new Date(f.date) }));
  const results = [];

  flights.forEach(out => {
    flights.forEach(ret => {
      if (out.destination === ret.origin && out.origin === ret.destination) {
        if (ret.dateObj >= out.dateObj) {
          const dur = daysBetween(out.dateObj, ret.dateObj);
          if (dur >= minDays && dur <= maxDays) {
            if (out.availability >= passengers && ret.availability >= passengers) {
              const total = (out.price + ret.price) * passengers;
              if (total <= budget) {
                results.push({ out, ret, dur, total });
              }
            }
          }
        }
      }
    });
  });

  return results.sort((a, b) => a.total - b.total).slice(0, 50);
};

export default findTrips;
