import { withStyles } from "#client";

const cardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

.card-title {
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

.flip-card {
  background-color: transparent;
  perspective: 1000px;
  font-family: sans-serif;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem;
}

.flip-card-front {
  background-image: url(/assets/svg/card.svg);
  background-position: center top 10px;
}

.flip-card-back {
  transform: rotateY(180deg);
}
`;

function Card() {
  return withStyles(cardStyles)(
    <div class="flip-card aspect-[96/56] h-96">
      <div class="flip-card-inner">
        <div class="flip-card-front bg-primary-950 flex flex-col justify-between px-5 py-10">
          <div class="flex justify-between items-center px-5">
            <h1 class="text-3xl font-medium card-title">BASE CARD</h1>
            <img src="/assets/svg/chip.svg" alt="Chip" class="w-20" />
          </div>
          <div class="mt-10 px-5">
            <p class="text-lg tracking-widest font-atm-digits text-left justify-start pb-10">
              **** **** **** 1234
            </p>
            {
              /* <div class="flex justify-between items-center mt-4">
              <p>Card Holder</p>
              <p>Expiry Date</p>
            </div> */
            }
            <div class="flex justify-between items-center mt-2">
              <p class="text-lg font-atm">Nikechukwu Okoronkwo</p>
              <p class="text-lg font-atm">12/34</p>
            </div>
          </div>
        </div>
        <div class="flip-card-back bg-primary-950">
          <p class="text-3xl font-black text-center m-0">BACK</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>,
  );
}

export default Card;
