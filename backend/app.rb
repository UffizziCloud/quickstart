class App
  def self.call(env)
    [ 200, {"Content-Type" => "text/html"}, ["Hello Uffizzi Dev 4"]]
  end
end
