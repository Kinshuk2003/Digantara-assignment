import { isSorted } from './sort.service.js';

// Function to perform binary search on a sorted array
export const binarySearch = async (input, target) => {
    try {
        let msg = 'Element not found';
        let index = -1;

        // Check if the input array is empty
        if (input.length === 0) {
            msg = "Empty array";
            return {msg, index};
        }

        // Check if the input array is sorted
        if (isSorted(input) === false) {
            msg = "Input Array is unsorted, Binary Search requires a sorted array in increasing order";
            return {msg, index};
        }

        let low = 0;
        let high = input.length - 1;
        let mid = 0;
        
        while (low <= high) {
            mid = Math.floor(low + (high-low)/2);
            if (input[mid] === target) {
                msg = 'Element found';
                index = mid;
                high = mid - 1 ;
            } else if (input[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return {msg, index};
    }
    catch (error) {
        throw new Error(error.message);
    }
}

// Function to perform linear search on an array
export const linearSearch = async (input, target) => {
    try {
        let msg = 'Element not found';
        let index = -1;

        // Check if the input array is empty
        if (input.length === 0) {
            msg = "Empty array";
            return {msg, index};
        }

        // Iterate through the input array to find the target element
        for (let i = 0; i < input.length; i++) {
            if (input[i] === target) {
                msg = 'Element found';
                index = i;
                break;
            }
        }
        
        return {msg, index};
    }
    catch (error) {
        throw new Error(error.message);
    }
}


