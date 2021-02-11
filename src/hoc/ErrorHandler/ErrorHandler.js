import React, { Component } from 'react';
import Model from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const ErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			err: null,
		};

		componentWillMount() {
			this.resInterceptors = axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ err: error });
				}
			);
			this.reqInterceptors = axios.interceptors.request.use((req) => {
				this.setState({ err: null });
				return req;
			});
		}

		componentWillUnmount() {
			axios.interceptors.response.eject(this.resInterceptors);
			axios.interceptors.request.eject(this.reqInterceptors);
		}

		errorConfirmedHandle = () => {
			this.setState({ err: null });
		};
		render() {
			return (
				<Aux>
					<Model show={this.state.err} modalClosed={this.errorConfirmedHandle}>
						{this.state.err ? this.state.err.message : null}
					</Model>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default ErrorHandler;
