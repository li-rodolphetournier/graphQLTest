export default class ArrayRevisited {
  value: any[] = [];
  length: number = 0;

  push(el: any) {
    const newArray = new Array(this.length + 1);

    for (let i = 0; i < this.length + 1; i++) {
      if (i === this.length) {
        newArray[i] = el;
      } else {
        newArray[i] = this.value[i];
      }
    }

    this.value = newArray;
    this.length++;
  }

  revertPush(): any | undefined {
    if (this.length > 0) {
      const removed = this.value.pop();
      this.length = this.value.length;
      return removed;
    }
    return undefined;
  }

  reverseArrayInPlace(tableau: any[]): any[] {
    let start = 0;
    let end = tableau.length - 1;
    while (start < end) {
      const temp = tableau[start];
      tableau[start] = tableau[end];
      tableau[end] = temp;
      start++;
      end--;
    }
    return tableau;
  }
  pop(): any | undefined {
    if (this.length > 0) {
      const newArray = new Array(this.length - 1);
      const LastElement = this.value[this.length - 1];

      for (let i = 0; i < this.length - 1; i++) {
        newArray[i] = this.value[i];
      }

      this.value = newArray;
      this.length--;
      return LastElement;
    }
    return;
  }

  shift(): any | undefined {
    if (this.length > 0) {
      const newArray = new Array(this.length - 1);
      const FirstElement = this.value[0];

      for (let i = 1; i < this.length; i++) {
        newArray[i - 1] = this.value[i];
      }

      this.value = newArray;
      this.length--;
      return FirstElement;
    }
    return;
  }
}

const myArray = new ArrayRevisited();
console.log(myArray.value);

console.log(myArray.length);

myArray.push(12);
console.log(myArray.value);
console.log(myArray.length);
