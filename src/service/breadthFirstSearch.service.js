// Function to perform Breadth-First Search (BFS) on a graph represented as an adjacency list
export const breadthFirstSearch = async (input, source) => {
    try {
        let visitedArray = [];  // Array to store the visited nodes
        
        // Check if the input adjacency list is empty
        if (input.length === 0) {
            return {msg: "Adjacencency List is Empty", visitedArray: visitedArray};
        }

        let queue = []; // Queue to store the nodes to be visited
        let visitedSet = new Set(); // Set to keep track of visited nodes
        
        queue.push(source);
        visitedSet.add(source);
        
        // Perform BFS traversal on the graph
        while (queue.length > 0) {
            let node = queue.shift(); // Dequeue the front node from the queue
            visitedArray.push(node);
            
            // Iterate through all the neighbors of the current node, Enqueue the unvisited neighbors
            for (let i = 0; i < input[node].length; i++) { 
                let neighbor = input[node][i];
                
                if (!visitedSet.has(neighbor)) {
                    queue.push(neighbor);
                    visitedSet.add(neighbor);
                }
            }
        }
        
        return {msg: "traversed Successfully", visitedArray: visitedArray};
    }
    catch (error) {
        throw new Error(error.message);
    }
}