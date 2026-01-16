import { useEffect, useState } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const UpdateChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const update = await check();
      
      if (update?.available) {
        setUpdateAvailable(true);
        setUpdateInfo(update);
        console.log(
          `Update available: ${update.currentVersion} -> ${update.version}`
        );
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  const installUpdate = async () => {
    if (!updateInfo) return;

    try {
      setDownloading(true);
      
      // Descargar e instalar la actualización
      await updateInfo.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            console.log('Download started');
            break;
          case 'Progress':
            setDownloadProgress(event.data.chunkLength);
            console.log(`Downloaded ${event.data.chunkLength} bytes`);
            break;
          case 'Finished':
            console.log('Download finished');
            break;
        }
      });

      // Reiniciar la aplicación para aplicar la actualización
      await relaunch();
    } catch (error) {
      console.error('Error installing update:', error);
      setDownloading(false);
    }
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🚀</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              ¡Nueva actualización disponible!
            </h3>
            <p className="text-sm text-blue-100 mb-3">
              Versión {updateInfo?.version} está lista para instalar
            </p>
            
            {downloading ? (
              <div>
                <div className="bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${Math.min(downloadProgress / 1000, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-blue-100">Descargando actualización...</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={installUpdate}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
                >
                  Actualizar ahora
                </button>
                <button
                  onClick={() => setUpdateAvailable(false)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/30 transition-colors"
                >
                  Más tarde
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChecker;
