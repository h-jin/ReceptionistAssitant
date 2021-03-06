import { connect } from "react-redux";
import Patients from "components/Patients";

export default connect(
    ({ list }) => ({ patientList: list })
)(Patients);