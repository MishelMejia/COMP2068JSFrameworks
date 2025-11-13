// Import required modules
const connect = require('connect');
const url = require('url');
const http = require('http');

/**
 * Calculates a math operation based on URL query parameters.
 * This function serves as the main Connect middleware/request handler.
 * @param {object} req - The incoming request object.
 * @param {object} res - The server response object.
 */
function calculate(req, res) {
    // Set the content type to plain text
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // Parse the URL to get the query string parameters. 
    // The 'true' argument tells it to parse the query into an object.
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // 1. Extract and validate parameters
    const method = query.method;
    // Use parseFloat to safely convert the string parameters to numbers
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    let result = 0;
    let operatorSymbol = '';
    let output = '';

    // Check if x and y are valid numbers
    if (isNaN(x) || isNaN(y)) {
        output = 'Error: Both x and y must be valid numbers.';
    } else if (!method) {
        output = 'Error: The "method" parameter is required.';
    } else {
        // 2. Determine the operation based on the 'method' parameter
        switch (method.toLowerCase()) {
            case 'add':
                result = x + y;
                operatorSymbol = '+';
                break;
            case 'subtract':
                result = x - y;
                operatorSymbol = '-';
                break;
            case 'multiply':
                result = x * y;
                operatorSymbol = '*';
                break;
            case 'divide':
                // Handle division by zero
                if (y === 0) {
                    output = 'Error: Cannot divide by zero.';
                    break;
                }
                result = x / y;
                operatorSymbol = '/';
                break;
            default:
                // Handle invalid method
                output = `Error: Invalid method '${method}'. Please use add, subtract, multiply, or divide.`;
                break;
        }

        // 3. Display the result in the specified format if no error occurred
        if (!output) {
            // Format: x [method] y = [result]
            output = `${x} ${operatorSymbol} ${y} = ${result}`;
        }
    }

    // Send the final output to the browser
    res.end(output);
}

// Initialize the Connect application
const app = connect();

// Use the calculate function as the only middleware/request handler
app.use(calculate);

// Create the HTTP server and listen on port 3000
http.createServer(app).listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
    console.log('Test add with URLs like: http://localhost:3000/?method=add&x=16&y=4');
    console.log('Test substract with URLs like: http://localhost:3000/?method=subtract&x=16&y=4');
    console.log('Test multiply with URLs like: http://localhost:3000/?method=multiply&x=16&y=4');
     console.log('Test divide with URLs like: http://localhost:3000/?method=divide&x=16&y=4');

});