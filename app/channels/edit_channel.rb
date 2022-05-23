class EditChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel5"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
