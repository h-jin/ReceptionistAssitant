import { connect } from "react-redux";
import PriorityList from "components/PriorityList";

export default connect(
    ({ list }) => ({ patientList: list })
)(PriorityList);