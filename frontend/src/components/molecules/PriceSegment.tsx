import { Price, TravelPricing } from "../../api/types";

interface PriceSegmentProps {
  price: Price;
  travelerPricings: TravelPricing[];
}

const PriceSegment: React.FC<PriceSegmentProps> = ({
  price,
  travelerPricings,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 rounded p-2 min-h-80 max-h-fit justify-between shadow-md hover:shadow-lg transition-shadow">
      {/* Price title */}
      <h1 className="text-xl font-bold text-center">Price</h1>

      {/* Base price */}
      <div className="flex justify-between">
        <p>Base price</p>
        <p>$ {price.base}</p>
      </div>

      {/* Taxes and fees */}
      <hr />
      <p className="text-center font-bold">Taxes and fees</p>
      <div className="flex justify-between flex-col ">
        {price.fees.map((fee) => (
          <div key={fee.type} className="flex justify-between">
            <p>{fee.type}</p>
            <p>$ {fee.amount}</p>
          </div>
        ))}
      </div>

      {/* Grand total */}
      <hr />
      <div className="flex justify-between">
        <p>Grand total</p>
        <p>
          $ {price.grandTotal} {price.currency}
        </p>
      </div>

      {/* Price per traveler */}

      <div className="flex justify-between rounded text-sm">
        <p>Price per traveler</p>
        <div className="flex flex-col gap-2">
          {travelerPricings.map((travelerPricing) => (
            <div
              key={travelerPricing.travelerId}
              className="flex justify-between gap-2"
            >
              <p>{travelerPricing.travelerType.toLowerCase()} - </p>
              <p>
                $ {travelerPricing.price.total} {price.currency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceSegment;
