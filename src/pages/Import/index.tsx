import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  useHistory();

  async function handleUpload(): Promise<void> {
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach(async uploadedFile => {
        const data = new FormData();
        data.append('file', uploadedFile.file);
        try {
          await api.post('/transactions/import', data);
          setUploadedFiles([]);
        } catch (err) {
          console.log(err.response.error);
        }
      });
    }
  }

  function submitFile(files: File[]): void {
    const newFiles = files.map(file => {
      return {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
    });

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  }

  return (
    <>
      <Header size="small" selected="importar" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
