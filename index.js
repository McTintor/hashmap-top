class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.buckets = new Array(initialCapacity);
      this.size = 0;
      this.loadFactor = loadFactor;
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        this.buckets[index] = [];
      }
  
      const bucket = this.buckets[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return;
        }
      }
  
      bucket.push([key, value]);
      this.size++;
  
      if (this.size / this.buckets.length > this.loadFactor) {
        this._resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (!bucket) return null;
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (!bucket) return false;
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
      }
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = new Array(this.buckets.length);
      this.size = 0;
    }
  
    keys() {
      const keysArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key] of bucket) {
            keysArray.push(key);
          }
        }
      }
      return keysArray;
    }
  
    values() {
      const valuesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [, value] of bucket) {
            valuesArray.push(value);
          }
        }
      }
      return valuesArray;
    }
  
    entries() {
      const entriesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) {
            entriesArray.push(entry);
          }
        }
      }
      return entriesArray;
    }
  
    _resize() {
      const oldBuckets = this.buckets;
      this.buckets = new Array(this.buckets.length * 2);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            this.set(key, value);
          }
        }
      }
    }
  }
  
  // Test the HashMap implementation
  const test = new HashMap();
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  
  // Overwrite some values
  test.set('apple', 'green');
  test.set('banana', 'green');
  
  // Add a new node to trigger resizing
  test.set('moon', 'silver');
  
  // Test methods
  console.log(test.get('apple')); // green
  console.log(test.has('banana')); // true
  console.log(test.remove('dog')); // true
  console.log(test.length()); // 12 (one item removed)
  test.clear();
  console.log(test.length()); // 0
  console.log(test.keys()); // []
  console.log(test.values()); // []
  console.log(test.entries()); // []
  
  class HashSet {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.map = new HashMap(initialCapacity, loadFactor);
    }
  
    add(key) {
      this.map.set(key, true);
    }
  
    has(key) {
      return this.map.has(key);
    }
  
    remove(key) {
      return this.map.remove(key);
    }
  
    clear() {
      this.map.clear();
    }
  
    length() {
      return this.map.length();
    }
  
    keys() {
      return this.map.keys();
    }
  }
  
  // Test the HashSet implementation
  const set = new HashSet();
  set.add('apple');
  set.add('banana');
  set.add('carrot');
  set.add('dog');
  
  console.log(set.has('apple')); // true
  console.log(set.has('banana')); // true
  console.log(set.remove('banana')); // true
  console.log(set.has('banana')); // false
  console.log(set.length()); // 3
  set.clear();
  console.log(set.length()); // 0
  console.log(set.keys()); // []  