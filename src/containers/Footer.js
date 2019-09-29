import { connect } from 'react-redux';
import Footer from '../components/Footer';

const mapStateToProps = (state, ownProps) => ({
  visibilityOfPanels: state.visibilityOfPanels,
  refIPInput: ownProps.refIPInput,
  refFlatList: ownProps.refFlatList,
});

export default connect(
  mapStateToProps,
)(Footer);
