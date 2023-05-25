import loading from '../assets/images/loading.gif';

function Loading() {
  return (
    <div
      className='loading'
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={loading} alt='Loading' />
    </div>
  );
}

export default Loading;
