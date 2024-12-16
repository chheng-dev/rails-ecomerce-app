Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Replace '*' with the specific domains allowed (e.g., 'https://example.com')

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end