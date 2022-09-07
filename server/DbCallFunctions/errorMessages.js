/**
 * @author Frederic Brockow
 * 
 *  module for all the erromessages associated with the
 *  try / catch / throw to insure uniformity, reduce bugs from typo,
 *  and easier maintenance
*/

const DATA_NOT_FOUND = "the data requested was not found";

const DATABASE_GENERIC_ERROR = "error communicating with the database"

const SUCCESS = "request was successfull";


module.exports = {
    DATA_NOT_FOUND, SUCCESS, DATABASE_GENERIC_ERROR
}