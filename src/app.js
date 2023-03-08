class SeatAudiences {
  constructor(seatsArr, passengers) {
    this.seatsArr = seatsArr;
    this.passengers = passengers;
    this.fienlSectionsSeats = [];
    this.turnOfPassenger = 1;
    this.drowSeats();
    this.makeDsions();
    this.distributePassengersBasedOnType("A");
    this.distributePassengersBasedOnType("W");
    this.distributePassengersBasedOnType("M");
    console.log(this.fienlSectionsSeats);
  }

  drowSeats() {
    if (this.passengers === 0) return "Airplane is empty";

    for (let i = 0; i < this.seatsArr.length; i++) {
      const groupOfseats = Array(this.seatsArr[i][1])
        .fill()
        .map(() => Array(this.seatsArr[i][0]).fill());
      this.fienlSectionsSeats.push(groupOfseats);
    }
  }

  makeDsions() {
    for (let i = 0; i < this.seatsArr.length; i++) {
      detectAisleSeats(
        this.seatsArr.length,
        i + 1,
        this.fienlSectionsSeats[i]
      );
      detectWindowSeats(
        this.seatsArr.length,
        i + 1,
        this.fienlSectionsSeats[i]
      );
    }
  }

  distributePassengersBasedOnType(type) {
    const cols = this.fienlSectionsSeats.reduce(
      (max, row) => Math.max(max, row.length),
      0
    );

    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < this.fienlSectionsSeats.length; i++) {
        if (j < this.fienlSectionsSeats[i].length) {
          this.fienlSectionsSeats[i][j].forEach((seatType, index) => {
            if (seatType === type) {
              this.fienlSectionsSeats[i][j][index] = this.turnOfPassenger;
              this.turnOfPassenger++;
            } else if (seatType === undefined && type === "M") {
              this.fienlSectionsSeats[i][j][index] = this.turnOfPassenger;
            }
          });
        }
      }
    }
  }
}

const seatsArr = [
  [3, 2],
  [4, 3],
  [2, 3],
  [3, 4],
];

const seatAudiences = new SeatAudiences(seatsArr, 30);




function detectAisleSeats(totalNumOfSections, numOfThisSection, sectionArr) {
  if (numOfThisSection === totalNumOfSections) {
    for (let i = 0; i < sectionArr.length; i++) {
      sectionArr[i][0] = "A";
    }
  } else if (numOfThisSection === 1) {
    for (let i = 0; i < sectionArr.length; i++) {
      sectionArr[i][sectionArr[i].length - 1] = "A";
    }
  } else {
    for (let i = 0; i < sectionArr.length; i++) {
      sectionArr[i][sectionArr[i].length - 1] = "A";
      sectionArr[i][0] = "A";
    }
  }

  return sectionArr;
}

function detectWindowSeats(totalNumOfSections, numOfThisSection, sectionArr) {
  if (numOfThisSection === totalNumOfSections) {
    for (let i = 0; i < sectionArr.length; i++) {
      sectionArr[i][sectionArr[i].length - 1] = "W";
    }
  } else if (numOfThisSection === 1) {
    for (let i = 0; i < sectionArr.length; i++) {
      sectionArr[i][0] = "W";
    }
  }
  return sectionArr;
}
