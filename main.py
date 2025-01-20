from app import create_app
from app.routes import bp

app = create_app()  # Initialize the app using the create_app() function.
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)
