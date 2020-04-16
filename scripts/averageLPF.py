import wave
from array import array

# read the file
with wave.open('htalk.wav', 'rb') as wav:
    channels = wav.getnchannels()
    bit_depth = wav.getsampwidth()
    sampling_rate = wav.getframerate()

    data = array('h')
    num_samples = wav.getnframes()

    # put the contents of the wav file in the array called data
    data.frombytes(wav.readframes(num_samples))

    print(f'read file, {num_samples} samples')

with wave.open('talk-out.wav', 'wb') as wav:
    wav.setnchannels(channels)
    wav.setsampwidth(bit_depth)
    wav.setframerate(sampling_rate)

    length = len(data)
    window = 100
    for i in range(0, length - window):
        sum = 0
        for j in range(window):
            sum += data[i + j]

        average = int(sum / window)

        data[i] = average


    wav.writeframes(data)
