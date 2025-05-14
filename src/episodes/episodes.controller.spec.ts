import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';
describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockEpisodesService = {
    findAll: async () => [{ id: 'id'}],
    findFeatured: async () => [{ id: 'id'}],
    findOne: mockFindOne,
    create: async () => ({ id: 'id'}),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ConfigModule ],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all episodes', async () => {
      const episodes = await controller.findAll('asc', 10);
      expect(episodes).toEqual([{ id: 'id' }]);
    });
  });

  describe('findFeatured', () => {
    it('should return the featured episode', async () => {
      const featuredEpisode = await controller.findFeatured();
      expect(featuredEpisode).toEqual([{ id: 'id' }]);
    });
  });

  describe('findOne', () => {
    describe('when the episode is found', () => {
      const episodeId = '1';
      const mockResult = { id: 1, name: 'my episode' };
  
      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });
  
      it('should call the service with correct params', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(1);
      });
  
      it('should return a single episode', async () => {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResult);
      });
    });

    describe('when the episode is not found', () => {
      const episodeId = 'dsdf';
      const mockResult = null;

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });
      
      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow('Episode not found');
      });
    })
    
  });

  describe('create', () => {
    it('should create a new episode', async () => {
      const episode = await controller.create({ title: 'title', description: 'description'});
      expect(episode).toEqual({ id: 'id' });
    });
  });
});
