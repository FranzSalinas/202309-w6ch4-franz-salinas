import { createServer } from 'http';
import { program } from 'commander';

program.option('-p, --port <value>');

program.parse();
const options = program.opts();

const PORT = options.port || process.env.PORT || 3030;

const server = createServer((req, res) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);

  if (url.pathname !== '/calculator') {
    res.statusCode = 404;
    res.statusMessage = 'Error 404';
    res.write('Error 404');
    res.end();
    return;
  }

  const parameterA = url.searchParams.get('a');
  const parameterB = url.searchParams.get('b');

  if (
    !parameterA ||
    !parameterB ||
    isNaN(Number(parameterA)) ||
    isNaN(Number(parameterB))
  ) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-type', 'text/html');
    res.write('<h1>Error</h1>');
    res.write('<p>Proporcione numeros validos para los parametros a y b.</p>');
    res.end();
    return;
  }

  res.setHeader('Content-type', 'text/html');
  res.write(`<h1>Calculadora del Venezolano</h1>`);
  res.write(
    `<p>${Number(parameterA)} + ${Number(parameterB)} = ${
      Number(parameterA) + Number(parameterB)
    }</p>`
  );
  res.write(
    `<p>${Number(parameterA)} - ${Number(parameterB)} = ${
      Number(parameterA) - Number(parameterB)
    }</p>`
  );
  res.write(
    `<p>${Number(parameterA)} * ${Number(parameterB)} = ${
      Number(parameterA) * Number(parameterB)
    }</p>`
  );
  res.write(
    `<p>${Number(parameterA)} / ${Number(parameterB)} = ${
      Number(parameterA) / Number(parameterB)
    }</p>`
  );
  res.end();
});

server.listen(PORT);

server.on('error', (error) => {
  console.log(error.message);
});
