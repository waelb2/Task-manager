const notFound = (req, res) => {
  return res.status(404).send('ROUTE DOES NOT EXIST')
}

module.exports = notFound
