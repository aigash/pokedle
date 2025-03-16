import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Met à jour l'état pour afficher l'UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez logger l'erreur dans un service de reporting
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    // Réinitialise l'état d'erreur
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    
    // Si une fonction de réinitialisation est fournie, l'appeler
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container p-4 bg-red-100 border border-red-400 text-red-700 rounded m-4">
          <h2 className="text-xl font-bold mb-2">Oups ! Quelque chose s&apos;est mal passé</h2>
          <p className="mb-2">Une erreur est survenue dans l&apos;application Pokédle.</p>
          {this.state.error && (
            <details className="mt-2 text-sm">
              <summary>Détails de l&apos;erreur</summary>
              <p className="mt-1">{this.state.error.toString()}</p>
            </details>
          )}
          <div className="mt-4 flex gap-2">
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={this.handleReset}
            >
              Réessayer
            </button>
            <button 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.href = '/pokedle'}
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onReset: PropTypes.func
};

export default ErrorBoundary;