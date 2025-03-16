// Function to check if an array is sorted in ascending order
export const isSorted = (input) => {
    if (input.length === 1) {
        return true;
    }

    for (let i = 1; i < input.length; i++) {
        if (input[i - 1] > input[i]) {
            return false;
        }
    }

    return true;
}

// Function to check if an array is sorted in descending order
export const isReverseSorted = (input) => {
    if (input.length === 1) {
        return true;
    }

    for (let i = 1; i < input.length; i++) {
        if (input[i - 1] < input[i]) {
            return false;
        }
    }

    return true;   
}

// Function to swap two elements in an array
async function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to partition the array and return the pivot index for quick sort
async function partition(arr, low, high) {
    try {
        let pivot = arr[high];
        let i = low - 1;
        
        // Iterate through the array and move elements less than pivot to the left
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                await swap(arr, i, j);
            }
        }

        await swap(arr, i + 1, high);

        return i + 1; // Return the partition index
    } catch (error) {
        throw new Error(error.message);
    }
}

// Helper function to perform quick sort on the array
async function quickSortHelper(arr, low, high) {
    try {
        if (low < high) {
            let pi = await partition(arr, low, high); // Partition the array
            await quickSortHelper(arr, low, pi - 1); // Recursively sort the left partition
            await quickSortHelper(arr, pi + 1, high); // Recursively sort the right partition
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to perform Quick Sort on an array
export const quickSort = async (input) => {
    try {
        // Check if the input array is already sorted
        if (isSorted(input) || isReverseSorted(input)) {
            return {msg: "Array is already sorted", arr: input};
        }

        let arr = input;
        let n = arr.length;

        await quickSortHelper(arr, 0, n - 1); // Call the helper function to perform quick sort
        
        return {msg: "Array sorted successfully", arr};
    } catch (error) {
        throw new Error(error.message);
    }
}
